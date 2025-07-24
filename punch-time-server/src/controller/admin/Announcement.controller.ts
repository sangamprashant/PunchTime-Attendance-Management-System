import { Request, Response } from "express";
import { createAnnouncementService } from "../../services/admin/Announcement.service";
import errorMessage from "../../utils/errorMessage";

export const createAnnouncementController = async (
  req: Request,
  res: Response
) => {
  try {
    await createAnnouncementService(req.body);
    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    res.status(401).json({ message: errorMessage(error) });
  }
};
