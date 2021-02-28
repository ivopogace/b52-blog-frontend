import { Profile } from './profile.model';
import {Post} from '../home/post.model';

export interface CommentModel {
  id: number;
  comment: string;
  createdAt: number;
  author: Profile;
  postsId: Post;
}
