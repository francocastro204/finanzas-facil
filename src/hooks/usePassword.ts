import { useState } from 'react';

export const usePassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);

	const validatePassword = (password: string) => {
		let strength = 0;
		if (password.length >= 8) strength++;
		if (password.match(/[A-Z]/)) strength++;
		if (password.match(/[a-z]/)) strength++;
		if (password.match(/[0-9]/)) strength++;
		if (password.match(/[^A-Za-z0-9]/)) strength++;
		setPasswordStrength(strength);
	};

	const getPasswordStrengthText = () => {
		switch (passwordStrength) {
			case 0:
			case 1:
				return { text: 'Muy débil', color: 'text-red-500' };
			case 2:
				return { text: 'Débil', color: 'text-orange-500' };
			case 3:
				return { text: 'Media', color: 'text-yellow-500' };
			case 4:
				return { text: 'Fuerte', color: 'text-green-500' };
			case 5:
				return { text: 'Muy fuerte', color: 'text-green-700' };
			default:
				return { text: '', color: '' };
		}
	};

	return {
		showPassword,
		setShowPassword,
		passwordStrength,
		validatePassword,
		getPasswordStrengthText,
	};
}; 