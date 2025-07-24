import { AnnouncementModel, IAnnouncement } from "../models/Announcement.model";

/**
 * Create a new office announcement
 * @param data Partial announcement data
 * @returns The created office announcement
 */
export const createAnnouncement = (
  data: Partial<IAnnouncement>
): Promise<IAnnouncement> => AnnouncementModel.create(data);
