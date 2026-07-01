import React from 'react';
import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAvatar = styled(Avatar)({
  border: '3px solid #F8BBD0',
  boxShadow: '0 2px 8px rgba(233, 30, 140, 0.2)',
  transition: 'transform 0.2s ease',
});

const CPBorderAvatar = styled(Avatar)({
  border: '3px solid transparent',
  backgroundImage:
    'linear-gradient(white, white), linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF, #9B59B6)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow: '0 2px 12px rgba(233, 30, 140, 0.3)',
});

const SpecialBorderAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'borderColor',
})<{ borderColor: string }>(({ borderColor }) => ({
  border: `3px solid ${borderColor}`,
  boxShadow: `0 2px 10px ${borderColor}40`,
}));

export type AvatarFrameType = 'default' | 'cp' | 'bestie' | 'soulmate' | 'homie';

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: number;
  frameType?: AvatarFrameType;
  showOnline?: boolean;
  online?: boolean;
}

const FRAME_COLORS: Record<string, string> = {
  bestie: '#4D96FF',
  soulmate: '#9B59B6',
  homie: '#FF8C00',
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  size = 48,
  frameType = 'default',
  showOnline = false,
  online = false,
}) => {
  if (frameType === 'cp') {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        invisible={!showOnline}
        color={online ? 'success' : 'default'}
        sx={{
          '& .MuiBadge-dot': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid white',
          },
        }}
      >
        <CPBorderAvatar src={src} alt={alt} sx={{ width: size, height: size }} />
      </Badge>
    );
  }

  if (frameType && FRAME_COLORS[frameType]) {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        invisible={!showOnline}
        color={online ? 'success' : 'default'}
        sx={{
          '& .MuiBadge-dot': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid white',
          },
        }}
      >
        <SpecialBorderAvatar
          src={src}
          alt={alt}
          borderColor={FRAME_COLORS[frameType]}
          sx={{ width: size, height: size }}
        />
      </Badge>
    );
  }

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      invisible={!showOnline}
      color={online ? 'success' : 'default'}
      sx={{
        '& .MuiBadge-dot': {
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: '2px solid white',
        },
      }}
    >
      <StyledAvatar src={src} alt={alt} sx={{ width: size, height: size }} />
    </Badge>
  );
};

export default UserAvatar;
