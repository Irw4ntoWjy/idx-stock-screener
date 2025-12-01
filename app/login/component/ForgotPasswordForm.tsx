'use client';

import { Button } from '@/components/ui/button';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export const ForgotPasswordForm = () => {
	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);

	const handleVerifyOTP = async (e: React.FormEvent) => {
		e.preventDefault();
		if (otp.length !== 6)
			return toast.error('Enter a valid 6-digit code');

		setLoading(true);
		// const result = await verifyForgotPasswordOTP(email, otp);
		setLoading(false);

		// if (result.success) {
		//   toast.success('OTP verified!');
		//   setStep('reset');
		// } else {
		//   toast.error(result.message ?? 'Invalid OTP');
		// }
	};

	return (
		<form onSubmit={handleVerifyOTP} className="space-y-6">
			<div className="flex flex-col items-center space-y-4">
				<Label>Enter 6-digit code</Label>
				<InputOTP
					maxLength={6}
					value={otp}
					onChange={(v) => setOtp(v)}
					disabled={loading}
				>
					<InputOTPGroup>
						{[0, 1, 2, 3, 4, 5].map((i) => (
							<InputOTPSlot key={i} index={i} />
						))}
					</InputOTPGroup>
				</InputOTP>

				<p className="text-sm text-center text-muted-foreground">
					Didn't receive it?
					<button
						type="button"
						className="font-medium text-blue-500 hover:underline ml-2 cursor-pointer"
						// onClick={handleSendOTP}
						disabled={loading}
					>
						Resend
					</button>
				</p>
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={otp.length !== 6 || loading}
			>
				{loading ? 'Verifying...' : 'Verify Code'}
			</Button>
		</form>
	);
};
