'use client';

import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { useRouter } from 'next/navigation';

import RegisterContainer from './_components/RegisterContainer';

export default function Register() {
  const router = useRouter();
  return (
    <div>
      <div
        className="back"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
        <span>뒤로가기</span>
      </div>
      <RegisterContainer />
    </div>
  );
}
