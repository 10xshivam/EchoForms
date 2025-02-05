'use client';
import { useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useUser();

  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");  // Redirect after login
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <div className="w-full min-h-96 flex flex-col justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full min-h-96 flex flex-col justify-center items-center">
      <h1>Welcome, {user?.fullName}!</h1>
      <div className="user-profile">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl} 
            alt="Profile" 
            className="profile-image"
            width={100}
            height={100}
          />
        )}
        <div className="user-details ">
          <p><strong>Name:</strong> {user?.fullName || 'Not provided'}</p>
          <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
          <p><strong>Account Created:</strong> {user?.createdAt?.toLocaleDateString()}</p>
        </div>
      </div>
      <Link href="/" className="sign-out-button">
        Sign Out
      </Link>
    </div>
  );
}