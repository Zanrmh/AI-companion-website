import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { checkSubscription } from '@/lib/subscription';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Không được phép', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Yêu cầu không hợp lệ', { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse('Cần đăng ký Pro', { status: 403 });
    }

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION_POST]', error);
    return new NextResponse('Lỗi máy chủ', { status: 500 });
  }
}
