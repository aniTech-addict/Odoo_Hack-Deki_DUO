import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({ username: '', email: '', password: '' });
  const [signInData, setSignInData] = useState({ username: '', password: '' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/auth/sign_up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        toast({ title: 'Success', description: 'OTP sent to your email. Please verify.' });
        navigate('/otp-verification');
      } else {
        toast({ title: 'Error', description: data.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred', variant: 'destructive' });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/auth/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        toast({ title: 'Success', description: 'Signed in successfully' });
        navigate('/');
      } else {
        toast({ title: 'Error', description: data.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'An error occurred', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Maintenance Manager</h1>
          <p className="mt-2 text-sm text-gray-600">Streamline your equipment maintenance workflow</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sign-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sign-in" className="text-sm font-medium">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up" className="text-sm font-medium">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-username" className="text-sm font-medium">Username</Label>
                    <Input
                      id="signin-username"
                      placeholder="Enter your username"
                      value={signInData.username}
                      onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="sign-up" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username" className="text-sm font-medium">Username</Label>
                    <Input
                      id="signup-username"
                      placeholder="Choose a username"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;