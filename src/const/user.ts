import { TopicDisplayMode } from '@/types/topic';
import { UserPreference } from '@/types/user';

export const DEFAULT_PREFERENCE: UserPreference = {
  customNickname: 'MarkAI',
  guide: {
    moveSettingsToAvatar: true,
    topic: true,
  }, // 默认用户名
  telemetry: null,
  topicDisplayMode: TopicDisplayMode.ByTime,
  useCmdEnterToSend: false,
};
