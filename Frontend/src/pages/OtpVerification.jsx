import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const email = localStorage.getItem('email');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: 'Error', description: 'User ID not found', variant: 'destructive' });
      return;
    }
    try {
      await axios.post('/api/v1/auth/verify_otp', { otp, userId });
      localStorage.removeItem('userId');
      localStorage.setItem('isLoggedIn', 'true');
      toast({ title: 'Success', description: 'OTP verified successfully' });
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-sm text-gray-600">
            An OTP has been sent to <span className="font-semibold text-blue-600">{email}</span>
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Enter OTP</CardTitle>
            <CardDescription className="text-center">Check your email for the verification code</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">OTP Code</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-11 text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-11 bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg">
                Verify OTP
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">
          Didn't receive the code? Check your spam folder or try signing up again.
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;