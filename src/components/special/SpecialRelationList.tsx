import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SpecialTypeCard from './SpecialTypeCard';
import SpecialGiftModal from './SpecialGiftModal';
import { SpecialRelationship } from '../../types';

interface SpecialRelationListProps {
  relationships: SpecialRelationship[];
}

const SpecialRelationList: React.FC<SpecialRelationListProps> = ({ relationships }) => {
  const [giftTarget, setGiftTarget] = useState<SpecialRelationship | null>(null);

  return (
    <Box>
      {relationships.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography sx={{ fontSize: 40, mb: 1 }}>🔗</Typography>
          <Typography sx={{ fontSize: 14, color: '#999' }}>还没有特殊关系</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2, mt: 2 }}>
          {relationships.map((rel) => (
            <SpecialTypeCard
              key={rel.id}
              relationship={rel}
              onGift={setGiftTarget}
            />
          ))}
        </Box>
      )}

      <SpecialGiftModal
        open={giftTarget !== null}
        relationship={giftTarget}
        onClose={() => setGiftTarget(null)}
      />
    </Box>
  );
};

export default SpecialRelationList;
