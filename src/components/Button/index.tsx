import * as C from './styles';

type Props = {
    label: string;
    onClick: () => void;
}

export const Button = ({ label, onClick }: Props) => {
    return (
        <C.ButtonStyled onClick={onClick}>
            {label}
        </C.ButtonStyled>
    );
}