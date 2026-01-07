import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ cx, css, token }) => ({
  // 图片操作按钮的公共样式
  generationActionButton: cx(
    'generation-actions',
    css`
      position: absolute;
      z-index: 10;
      inset-block-start: 8px;
      inset-inline-end: 8px;

      opacity: 0;

      transition: opacity 0.1s ${token.motionEaseInOut};
    `,
  ),

  imageContainer: css`
    position: relative;
    overflow: hidden;
    width: 100%;

    &:hover .generation-actions {
      opacity: 1;
    }
  `,
  loadingContent: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    color: ${token.colorTextTertiary};
  `,
  placeholderContainer: css`
    position: relative;

    overflow: hidden;

    width: 100%;

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;

    animation: gradient 3s ease infinite;

    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }

      50% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0% 50%;
      }
    }

    &:hover .generation-actions {
      opacity: 1;
    }
  `,

  spinIcon: css`
    color: #fff;
  `,

  text: css`
    font-weight: 500;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 20%);
  `,
}));
