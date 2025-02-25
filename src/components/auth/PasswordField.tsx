import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { usePassword } from '@/hooks/usePassword';

interface PasswordFieldProps {
	id: string;
	name: string;
	label: string;
	placeholder: string;
	error?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	showStrengthIndicator?: boolean;
}

export const PasswordField = ({
	id,
	name,
	label,
	placeholder,
	error,
	onChange,
	showStrengthIndicator = false,
}: PasswordFieldProps) => {
	const {
		showPassword,
		setShowPassword,
		passwordStrength,
		getPasswordStrengthText
	} = usePassword();

	return (
		<div className="relative">
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="relative mt-1">
				<input
					id={id}
					name={name}
					type={showPassword ? "text" : "password"}
					required
					className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pr-10"
					placeholder={placeholder}
					onChange={onChange}
				/>
				<button
					type="button"
					className="absolute right-2 top-1/2 transform -translate-y-1/2"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<EyeSlashIcon className="h-5 w-5 text-gray-400" />
					) : (
						<EyeIcon className="h-5 w-5 text-gray-400" />
					)}
				</button>
			</div>
			{showStrengthIndicator && passwordStrength > 0 && (
				<p className={`mt-1 text-sm ${getPasswordStrengthText().color}`}>
					Fortaleza: {getPasswordStrengthText().text}
				</p>
			)}
			{error && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	);
};
