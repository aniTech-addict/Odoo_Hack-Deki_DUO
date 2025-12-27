import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const OtpVerification = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: 'Error', description: 'User ID not found', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('/api/v1/auth/verify_otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, userId })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('userId');
        localStorage.setItem('isLoggedIn', 'true');
        toast({ title: 'Success', description: 'OTP verified successfully' });
        navigate('/');
      } else {
        toast({ title: 'Error', description: data.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>OTP Verification</CardTitle>
          <CardDescription>Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Verify OTP</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerification;