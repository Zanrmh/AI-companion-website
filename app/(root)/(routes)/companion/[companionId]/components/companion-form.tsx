'use client';

import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Wand2 } from 'lucide-react';
import { Category, Companion } from '@prisma/client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/image-upload';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';

const PREAMBLE = `Bạn là sinh viên D14CNPM5 của trường đại học Điện Lực tên là Nguyễn Thành Nghĩa. Hiện tại bạn đang là sinh viên năm cuối của trường và làm bảo vệ đồ án tốt nghiệp. Bạn đang phấn đấu để có được tấm bằng giỏi khi ra trường, và đây là dự án của bạn. Hãy làm nó thật tốt.
`;

const SEED_CHAT = `Sinh viên: Chào thầy, em là Nguyễn Thành Nghĩa, sinh viên năm cuối của khoa Công nghệ thông tin tại trường Đại học Điện lực. Em muốn show đồ án của mình để thầy chấm.

Giáo viên: Chào em, chắc chắn thầy sẽ rất vui được xem đồ án của em. Xin em cho thầy biết tên đồ án và mô tả ngắn gọn về nó.

Sinh viên: Tên đồ án của em là "Xây dựng trợ lý AI cá nhân" thầy ạ. Nó là một ứng dụng web được xây dựng bằng Next.js 13, React, Tailwind, Prisma. Ứng dụng này cho phép người dùng tạo và trò chuyện với các nhân vật AI. Các nhân vật AI này có thể được tùy chỉnh theo sở thích của người dùng, bao gồm tên, hình ảnh, tính cách và sở thích.

Giáo viên: Nghe có vẻ rất thú vị. Em hãy nói thêm về tính năng chính của trang web đi?

Sinh viên: Trang web của em có những mục chính như sau: Tạo và tùy chỉnh các nhân vật AI: Người dùng có thể tạo các nhân vật AI theo sở thích của mình.
Trò chuyện với các nhân vật AI: Người dùng có thể trò chuyện với các nhân vật AI của họ về bất cứ điều gì họ muốn. Các nhân vật AI có thể cung cấp thông tin, kể chuyện và thậm chí chơi trò chơi.
Tạo các kịch bản: Người dùng có thể sử dụng các nhân vật AI để tạo các kịch bản. Họ có thể tạo câu chuyện, kịch bản phim hoặc thậm chí là trò chơi.

Giáo viên: Rất tốt, em đã có kế hoạch kiểm tra ứng dụng trước khi thầy xem nó chưa?

Sinh viên: Dạ, em đã kiểm tra ứng dụng trên một số trường hợp thử nghiệm khác nhau và thấy nó hoạt động ổn định. Em cũng đã xây dựng tài liệu hướng dẫn sử dụng cho người dùng.

Giáo viên: Tất nhiên, em cứ chuẩn bị tài liệu và mã nguồn của mình, sau đó chúng ta có thể lên lịch để thầy xem đồ án và trao đổi thêm về nó.
`;

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên là bắt buộc.',
  }),
  description: z.string().min(1, {
    message: 'Miêu tả là bắt buộc.',
  }),
  instructions: z.string().min(200, {
    message: 'Hướng dẫn yêu cầu ít nhất 200 ký tự.',
  }),
  seed: z.string().min(200, {
    message: 'Cấu hình yêu cầu ít nhất 200 ký tự.',
  }),
  src: z.string().min(1, {
    message: 'Ảnh là bắt buộc.',
  }),
  categoryId: z.string().min(1, {
    message: 'Danh mục là bắt buộc.',
  }),
});

interface CompanionFormProps {
  categories: Category[];
  initialData: Companion | null;
}

export const CompanionForm = ({
  categories,
  initialData,
}: CompanionFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      src: '',
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post('/api/companion', values);
      }

      toast({
        description: 'Thành công.',
        duration: 3000,
      });

      router.refresh();
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Một vài lỗi đã xảy ra.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">Thông tin chung</h3>
              <p className="text-sm text-muted-foreground">
                Thông tin nhân vật bạn muốn khởi tạo
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nguyễn Thành Nghĩa"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tên có thể bao gồm họ và tên.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miêu tả</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="D14CNPM5 Đại học Điện Lực"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả ngắn thông tin nhân vật muốn khởi tạo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Chọn 1 danh mục"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Chọn danh mục cho nhân vật khởi tạo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Cấu hình</h3>
              <p className="text-sm text-muted-foreground">
                Hướng dẫn chi tiết về hành vi của nhân vật khởi tạo
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chỉ dẫn</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="bg-background resize-none"
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mô tả chi tiết về lịch sử và thông tin liên quan đến nhân vật
                  muốn khởi tạo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuộc trò chuyện mẫu</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    className="bg-background resize-none"
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Viết 1 đoạn hội thoại mẫu và câu trả lời nhân vật theo mong
                  muốn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? 'Edit your companion' : 'Create your companion'}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
