import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { email, message, property, recipient } = request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { user } = sessionUser;

    // Cannot send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: 'Cannot Send A Message To Yourself' }),
        { status: 400 }
      );
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message Sent' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
