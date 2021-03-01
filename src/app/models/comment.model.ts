import { Profile } from './profile.model';
import {Post} from '../home/post.model';

export interface CommentModel {
  comment: string;
  author: Profile;
  postsId: Post;
}
