import express, { Request, Response } from "express";
import { requireAuth } from "@lostickets/common";
import { currentUser } from "@lostickets/common";
const router = express.Router();

router.post("/api/tickets",currentUser, requireAuth, (req: Request, res: Response) => {
	res.status(200).send({});
});

export { router as createTicketRouter };
