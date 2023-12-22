import { IconButton } from '@chakra-ui/button';
import { HStack, Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { BiLike, BiSolidLike } from 'react-icons/bi';

interface PropTypes {
  likeCount: number;
}

const LikeButton = ({ likeCount }: PropTypes) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(likeCount);

  const clickLikeButton = () => {
    if (likes === undefined) return;
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked((isLiked) => !isLiked);
  };

  return (
    <HStack minW={16} justify={'space-between'}>
      <IconButton
        variant='outline'
        colorScheme='purple'
        aria-label='Mark as liked'
        fontSize='20px'
        onClick={clickLikeButton}
        icon={isLiked ? <BiSolidLike /> : <BiLike />}
      />
      <Text>{likes}</Text>
    </HStack>
  );
};

export default LikeButton;
