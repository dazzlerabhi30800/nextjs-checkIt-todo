import AuthLogin from "./_components/AuthLogin";
import GoogleAuth from "./_components/GoogleAuth";
// import Otp from "./_components/Otp";

export default function Home() {
  return (
    <main className="flex flex-1 h-inherit justify-center items-center">
      <AuthLogin>
        <GoogleAuth />
      </AuthLogin>
      {/* <Otp /> */}
    </main>
  );
}
