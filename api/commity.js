import { client } from './client';

/* 커뮤니티 API 관련 사항들 */

//게시판 목록 가져오기
const getCommunitySection = () => client.get(`/community/list`);

export { getCommunitySection };
