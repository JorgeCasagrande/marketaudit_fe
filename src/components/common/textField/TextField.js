import './TextField.scss';
import {
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel
} from '@material-ui/core';
import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const TextField = (props) => {
	const { defaultValue, disabled, error, errorMessage, label, onChange, value, required, type } = props;
	const ErrorAdornment = (
		<InputAdornment
			position={'end'}
		>
			<IconButton
				className={'adornment'}
				aria-label="error state"
			>
				<ErrorIcon />
			</IconButton>
		</InputAdornment>
	);

	return (
		<FormControl
			margin={'normal'}
			className={'textfield-container'}
			size={'medium'}
			disabled={disabled}
			error={error}
		>
			<div className={classNames('input-container', { 'error-state': error })}>
				<InputLabel
					className={'textfield-label'}
					htmlFor="textfield-input"
					disabled={disabled}
					error={error}
					variant={'filled'}
					required={required}
				>
					{label}
				</InputLabel>
				<Input
					className={'textfield-input'}
					disableUnderline={true}
					id="textfield-input"
					aria-describedby="textfield-helper-text"
					defaultValue={defaultValue}
					disabled={disabled}
					error={error}
					endAdornment={error ? ErrorAdornment : undefined}
					onChange={onChange}
					value={value}
					type={type}
				/>
			</div>
			<FormHelperText
				className={'textfield-helper-text'}
				id="textfield-helper-text"
				disabled={disabled}
				error={error}
				variant={'filled'}
			>
				{error ? errorMessage : ' '}
			</FormHelperText>
		</FormControl>
	);
};

export default TextField;
