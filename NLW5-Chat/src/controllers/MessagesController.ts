import { Request, Response } from 'express';

import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;

    const messagesService = new MessagesService();

    const message = await messagesService.create({ admin_id, user_id, text });

    return response.json(message);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const messagesService = new MessagesService();

    const messages = await messagesService.listByUser(id);

    return response.json(messages);
  }
}

export { MessagesController };