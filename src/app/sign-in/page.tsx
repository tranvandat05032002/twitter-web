"use client";
import { LayoutAuth } from "@/components/common";
import LoadingPage from "@/components/common/Loading/LoadingPage";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store";
import { Routers } from "@/utils/router/routers";
const DynamicSignIn = dynamic(() => import("@/components/layouts/SignIn"), {
  loading: () => <LoadingPage></LoadingPage>,
});
const SignIn: React.FC = () => {
  const { isLoggedIn } = useAuth((state) => state);
  const router = useRouter();
  if (isLoggedIn()) {
    router.push(Routers.homePage);
  }
  return (
    <LayoutAuth>
      <DynamicSignIn></DynamicSignIn>
    </LayoutAuth>
  );
};

export default SignIn;
