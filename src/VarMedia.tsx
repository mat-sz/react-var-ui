import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IconUpload } from './icons/IconUpload';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarMediaProps extends IVarBaseInputProps<string> {
  /**
   * Whether the component should accept image/* files.
   */
  acceptImage?: boolean;

  /**
   * Whether the component should accept audio/* files.
   */
  acceptAudio?: boolean;

  /**
   * Whether the component should accept video/* files.
   */
  acceptVideo?: boolean;
}

/**
 * Media (audio/video/image) input component. Accepts and provides a blob URL.
 *
 * If acceptImage, acceptAudio and acceptVideo are all false, the component will accept all 3.
 */
export const VarMedia: FC<IVarMediaProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  className,
  acceptImage,
  acceptAudio,
  acceptVideo,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const [type, setType] = useState<string>();
  const accept = useMemo(() => {
    let accept = '';

    if (acceptImage) {
      accept += 'image/*,';
    }

    if (acceptAudio) {
      accept += 'audio/*,';
    }

    if (acceptVideo) {
      accept += 'video/*,';
    }

    if (accept.endsWith(',')) {
      accept = accept.slice(0, -1);
    }

    if (!accept) {
      accept = 'image/*,audio/*,video/*';
    }

    return accept;
  }, [acceptImage, acceptAudio, acceptVideo]);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCurrentValue(url);
    },
    [setCurrentValue, setType]
  );

  const updatePreview = useCallback(
    async (url: string) => {
      if (!url) {
        setType(undefined);
        return;
      }

      const res = await fetch(url);
      setType(res?.headers?.get('Content-Type')?.split('/')?.[0]);
    },
    [setType]
  );

  useEffect(() => {
    updatePreview(currentValue);
  }, [currentValue]);

  let preview = (
    <div className="react-var-ui-media-metadata">
      {currentValue ? 'Unsupported file type.' : ''}
    </div>
  );

  switch (type) {
    case 'image':
      preview = (
        <div
          className="react-var-ui-media-background"
          style={{
            backgroundImage: `url('${currentValue}')`,
          }}
          title="Media preview"
        />
      );
      break;
    case 'video':
      preview = (
        <video
          className="react-var-ui-media-background"
          muted
          loop
          autoPlay
          src={currentValue}
          title="Media preview"
        />
      );
      break;
    case 'audio':
      preview = (
        <audio
          className="react-var-ui-media-audio"
          loop
          controls
          src={currentValue}
          title="Media preview"
        />
      );
      break;
  }

  return (
    <VarBase label={label} disabled={disabled} className={className} column>
      <div className="react-var-ui-media">
        {preview}
        <IconUpload />
        <input
          type="file"
          accept={accept}
          onChange={onFileChange}
          title="Media upload"
        />
      </div>
    </VarBase>
  );
};
