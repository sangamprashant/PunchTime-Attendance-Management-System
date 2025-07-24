import { IAnnouncement } from "../../models/Announcement.model";
import { createAnnouncement } from "../../repositories/Announcement.repository";

export const createAnnouncementService = async (data: Partial<IAnnouncement>) => {
  await createAnnouncement(data);
};
