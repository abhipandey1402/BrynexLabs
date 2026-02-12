import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    className?: string;
}

type ButtonAsButton = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type ButtonAsLink = BaseButtonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-accent-gradient text-white font-semibold
    shadow-button
    hover:shadow-glow-strong hover:brightness-110
    active:brightness-95
    border border-transparent
  `,
    secondary: `
    bg-transparent text-foreground font-medium
    border border-border hover:border-border-hover
    hover:bg-background-tertiary
    active:bg-background-secondary
  `,
    ghost: `
    bg-transparent text-foreground-secondary font-medium
    hover:text-foreground
    border border-transparent
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-button',
    lg: 'px-8 py-4 text-lg rounded-button',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = `
    inline-flex items-center justify-center gap-2
    transition-all duration-200 ease-out
    focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer select-none
    whitespace-nowrap
  `;

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    if ('href' in props && props.href) {
        const { href, ...anchorProps } = props as ButtonAsLink;
        return (
            <a href={href} className={combinedClassName} {...anchorProps}>
                {children}
            </a>
        );
    }

    const buttonProps = props as ButtonAsButton;
    return (
        <button className={combinedClassName} {...buttonProps}>
            {children}
        </button>
    );
}
