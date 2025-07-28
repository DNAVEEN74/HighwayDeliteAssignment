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

router.put('/updatenote', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { noteId, notes } = req.body;
    const user = req.user as { userId: string };

    if (!noteId || !notes) {
      return res.status(ResponseStatus.Error).json({ message: "noteId and notes are required" });
    }

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: noteId, userId: user.userId },
      { notes },
      { new: true }
    );

    res.status(ResponseStatus.Success).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(ResponseStatus.Error).json({ message: `Failed to update note: ${err}` });
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

module.exports = router;