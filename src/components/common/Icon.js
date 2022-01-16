import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from "react";

function useDynamicSVGImport(name, options = {}) {
  const ImportedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import("!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/images"+ name +".svg")).default;
        if (onCompleted) {
          onCompleted(name, ImportedIconRef.current);
        }
      } catch (err) {
        if (onError) {
          onError(err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
const Icon = ({ name, onCompleted, onError, ...rest }) => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(name, {
    onCompleted,
    onError
  });
  if (error) {
    console.log(error)
    return <img />;
  }
  if (loading) {
    return <LoadingOutlined style={{ fontSize: 12 }} spin />;
  }
  if (SvgIcon) {
    return <SvgIcon {...rest} />;
  }
  return null;
};
export default Icon;
