"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = void 0;
const Announcement_model_1 = require("../models/Announcement.model");
/**
 * Create a new office announcement
 * @param data Partial announcement data
 * @returns The created office announcement
 */
const createAnnouncement = (data) => Announcement_model_1.AnnouncementModel.create(data);
exports.createAnnouncement = createAnnouncement;
