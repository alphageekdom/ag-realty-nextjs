import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify('User ID Is Required'), {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const messages = await Message.find({ recipient: userId })
      .populate('sender', 'name')
      .populate('property', 'title');

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, message, phone, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: 'You Must Be Logged In To Send A Message' }),
        { status: 401 }
      );
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
      name,
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
