import { Router, Request, Response, NextFunction } from "express";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { ResponseStatus } from "../server";
import { Notes } from "../db";
import mongoose from "mongoose";

const router = Router();

router.post('/createnote', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { notes } = req.body;
    const user = req.user as { userId: string };

    if (!notes) {
      return res.status(400).json({ message: "Note is required" });
    }

    const newNote = await Notes.create({
      userId: new mongoose.Types.ObjectId(user.userId),
      notes: notes
    });

    return res.status(ResponseStatus.Success).json({ message: "Note uploaded successfully"});
  } catch (err) {
    return res.status(ResponseStatus.Error).json({ message: `Failed to upload note: ${err}` });
  }
});

router.get('/getnote', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = req.user as { userId: string };

    const userNotes = await Notes.find({ userId: user.userId });

    return res.status(ResponseStatus.Success).json({ notes: userNotes });
  } catch (err) {
    return res.status(ResponseStatus.Error).json({ message: `Failed to retrieve notes: ${err}` });
  }
});

router.delete('/deletenote', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { noteId } = req.body;
    const user = req.user as { userId: string };

    if (!noteId) {
      return res.status(400).json({ message: "noteId is required" });
    }

    const deletedNote = await Notes.findOneAndDelete({
      _id: noteId,
      userId: user.userId
    });

    res.status(ResponseStatus.Success).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(ResponseStatus.Error).json({ message: `Failed to delete note: ${err}` });
  }
});

export default router;