import React from "react";
import Card from "../components/ui/Card";
import { useGetProfile } from "../api/authApi";

const ProfilePage: React.FC = () => {
  const { data, isLoading, error } = useGetProfile();
  
  if (isLoading) {
    return <div className="container">Loading profile...</div>;
  }
  
  if (error) {
    return (
      <div className="container">
        <p className="error-message">Error loading profile data</p>
      </div>
    );
  }
  
  const user = data?.data?.user;
  
  return (
    <div className="container profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      
      <Card>
        <h2>User Details</h2>
        <div>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
