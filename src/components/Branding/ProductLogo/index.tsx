import { LobeHub, LobeHubProps } from '@lobehub/ui/brand';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { BRANDING_NAME } from '@/const/branding';
import { isCustomBranding } from '@/const/version';

import CustomLogo from './Custom';

interface ProductLogoProps extends LobeHubProps {
  height?: number;
  width?: number;
}

export const ProductLogo = memo<ProductLogoProps>((props) => {
  const { type, size = 32, ...rest } = props;

  // 如果是 combine 类型，显示 LobeHub logo + MarkAI 文本
  if (type === 'combine') {
    return (
      <Flexbox align={'center'} flex={'none'} horizontal {...rest}>
        <LobeHub size={size} />
        <div
          style={{
            fontSize: size / 1.5,
            fontWeight: 'bolder',
            marginLeft: Math.round(size / 4),
            userSelect: 'none',
          }}
        >
          {BRANDING_NAME}
        </div>
      </Flexbox>
    );
  }

  // 其他情况下，如果是自定义品牌使用 CustomLogo，否则使用 LobeHub
  if (isCustomBranding) {
    return <CustomLogo {...props} />;
  }

  return <LobeHub {...props} />;
});
