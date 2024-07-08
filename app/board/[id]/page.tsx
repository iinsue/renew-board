import { DeletePostComponent } from "./_components/delete";
import { PostContent } from "./_components/post";

type Props = {
  params: {
    id: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-200">
        <h1>상세 페이지</h1>
        <div className="w-[800px]">
          <PostContent postId={params.id} />
        </div>
        <DeletePostComponent postId={params.id} className="mt-4 w-[200px]" />
      </div>
    </>
  );
};

export default PostDetailPage;
