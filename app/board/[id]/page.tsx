import { PostContent } from "./_components/content";

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
      </div>
    </>
  );
};

export default PostDetailPage;
