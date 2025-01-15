import { supabase } from '../supabase';

// 인증 관련 타입 정의
export type AuthUser = {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
};

export type AdminLog = {
  id: string;
  admin_id: string;
  target_user_id: string;
  action: string;
  old_value: any;
  new_value: any;
  created_at: string;
};

// 인증 관련 헬퍼 함수들
export const auth = {
  // 현재 로그인한 사용자 정보 가져오기
  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase.from('users').select('*').eq('id', user.id).single();

    return data as AuthUser | null;
  },

  // 이메일로 로그인
  signInWithEmail: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // 이메일로 회원가입
  signUpWithEmail: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // 로그아웃
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // 관리자 권한 체크
  checkAdminRole: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase.from('users').select('role').eq('id', user.id).single();

    if (error || !data) return false;

    return data.role === 'admin';
  },

  // 사용자 역할 변경 (관리자만 가능)
  updateUserRole: async (userId: string, newRole: 'admin' | 'user') => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('로그인이 필요합니다.');

    const isAdmin = await auth.checkAdminRole();
    if (!isAdmin) {
      throw new Error('관리자 권한이 필요합니다.');
    }

    // 현재 사용자의 role 조회
    const { data: currentData } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    // role 업데이트
    const { error } = await supabase.from('users').update({ role: newRole }).eq('id', userId);
    if (error) throw error;

    // 로그 기록
    const { error: logError } = await supabase.from('admin_logs').insert({
      admin_id: user.id,
      target_user_id: userId,
      action: 'role_update',
      old_value: { role: currentData?.role },
      new_value: { role: newRole },
    });

    if (logError) throw logError;
  },

  // 모든 사용자 목록 조회 (관리자만 가능)
  listUsers: async () => {
    const isAdmin = await auth.checkAdminRole();
    if (!isAdmin) {
      throw new Error('관리자 권한이 필요합니다.');
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AuthUser[];
  },

  // 관리자 로그 조회 (관리자만 가능)
  listAdminLogs: async () => {
    const isAdmin = await auth.checkAdminRole();
    if (!isAdmin) {
      throw new Error('관리자 권한이 필요합니다.');
    }

    const { data, error } = await supabase
      .from('admin_logs')
      .select(
        `
        id,
        admin_id,
        target_user_id,
        action,
        old_value,
        new_value,
        created_at,
        admin:users!admin_id(email),
        target:users!target_user_id(email)
      `
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as unknown as (AdminLog & {
      admin: { email: string };
      target: { email: string };
    })[];
  },
};
