import React from 'react';
import styled from 'styled-components';
import { Colors, Dims, Fonts } from '../constants';
import { Sizes, Styles } from '../enums';

interface IProps {
    onClick?: Function;
    disabled?: boolean;
    style?: Styles;
    size?: Sizes;
    mode?: 'default' | 'link' | 'outline';
    textAlign?: 'left' | 'center' | 'right';
    rounded?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<IProps> =
    ({ style = Styles.default, size = Sizes.md, mode = 'default', textAlign = 'center', ...props }) => {
    const colors = getColors(style, Colors[style]);
    const dims = Dims[size];
    return (
        <ButtonElement
            dims={dims}
            colors={colors}
            mode={mode}
            textAlign={textAlign}
            rounded={props.rounded}
            fullWidth={props.fullWidth}
            disabled={props.disabled}
            onClick={() => props.onClick && props.onClick()}
        >{props.children}</ButtonElement>
    );
};

interface StyledProps {
    dims?: any;
    colors?: any;
    mode?: string;
    rounded?: boolean;
    textAlign?: string;
    fullWidth?: boolean;
}

const ButtonElement = styled.button<StyledProps>`
    box-sizing: border-box;
    height: ${props => props.dims.elementHeight}px;
    padding: ${props => props.dims.spacings}px ${props => props.dims.spacing}px;
    background: ${props => props.colors.idleColor};
    border: 0 none;
    border-radius: ${props => props.rounded ? 50 : props.dims.borderRadius}px;
    color: ${props => props.colors.textColor};
    text-align: ${props => props.textAlign};
    font: ${props => props.dims.fontSize}px/${props => props.dims.lineHeight} "${Fonts.ff}";
    font-weight: 400;
    cursor: pointer;
    
    &:hover {
        border-color: ${props => props.colors.borderHoverColor};
        background-color: ${props => props.colors.hoverColor};
    }
    &:focus {
        outline: 0 none;
    }
    &:active:focus {
        background: ${props => props.colors.activeColor};
        border-color: ${props => props.colors.borderColor};
        box-shadow: inset 0 0 10px ${props => props.colors.shadowColor}50;
    }
    
    ${props => props.fullWidth && `
        width: 100%;
    `}
    
    ${props => props.mode === 'link' ? `
        height: auto;
        padding: 0;
        background: none;
        border: 0 none;
        font-weight: 400;
        color: ${props.colors.linkColor};

        &:hover {
            background: none;
            color: ${props.colors.linkColor};
            text-decoration: underline;
        }
        &:active:focus {
            background: none;
            box-shadow: none;
            color: ${props.colors.linkColor};
        }
    ` : props.mode === 'outline' && `
        background: none;
        color: ${props.colors.outlineTextColor};
        border: 1px solid ${props.colors.borderColor};

        &:hover {
            background: ${props.colors.hoverColor};
            border-color: ${props.colors.borderHoverColor};
            color: ${props.colors.textColor};
        }
        &:active:focus {
            background: ${props.colors.activeColor};
            border-color: ${props.colors.borderColor};
            color: ${props.colors.textColor};
        }
    `}
    
    &:disabled, &:disabled:hover, &:disabled:active:focus {
        background: none;
        border-color: ${Colors[Styles.default].baseL0};
        color: ${Colors[Styles.default].baseL0};
        cursor: default;
    }
`;
const getColors = (style: string, colors: any): Scheme => {
    if (style === 'default') {
        return {
            linkColor: colors.text,
            textColor: colors.text,
            outlineTextColor: colors.textColor,
            idleColor: colors.baseL3,
            hoverColor: colors.baseL1,
            activeColor: colors.baseL2,
            borderColor: colors.text,
            borderHoverColor: colors.baseL0,
            shadowColor: colors.baseL0
        };
    } else {
        return {
            linkColor: colors.baseL2,
            textColor: colors.text,
            outlineTextColor: colors.baseL2,
            idleColor: colors.baseL2,
            hoverColor: colors.baseL3,
            activeColor: colors.baseL2,
            borderColor: colors.baseL0,
            borderHoverColor: colors.baseL2,
            shadowColor: colors.baseL0
        };
    }
};

type Scheme = {
    linkColor: string;
    textColor: string;
    outlineTextColor: string;
    idleColor: string;
    hoverColor: string;
    activeColor: string;
    borderColor: string;
    borderHoverColor: string;
    shadowColor: string;
}