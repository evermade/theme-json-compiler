type WP_Typography = {
  fontSize: number;
  lineHeight?: number;
  fontWeight?: number;
  letterSpacing?: number;
  textDecoration?: string;
};

type WP_Color = {
  name: string;
  slug: string;
  color: string;
};

interface WP_Elements {
  [key: string]: {
    typography: WP_Typography;
  };
}
