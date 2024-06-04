import * as C from './styles';

type Props = {
    value: string;
}

export const Display = ({ value }: Props) => {
    return (
        <C.DisplayContainer>
            {value}
        </C.DisplayContainer>
    );
}