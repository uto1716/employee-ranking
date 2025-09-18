const { createClient } = require('@supabase/supabase-js');

// Supabase設定
const supabaseUrl = 'https://ugjpcfcuswncrmrxlokn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnanBjZmN1c3duY3Jtcnhsb2tuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA5MTM1NCwiZXhwIjoyMDczNjY3MzU0fQ.pNRnXw_ekqSVkeUMFqt_E1xP-qzpBGg-mHnv_I_cgxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateUserSchema() {
  console.log('🔄 ユーザースキーマのマイグレーションを開始します...\n');

  try {
    // 1. user_typeカラムを追加
    console.log('1. user_typeカラムを追加中...');
    const { error: userTypeError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='user_type'
          ) THEN
            ALTER TABLE public.users
            ADD COLUMN user_type VARCHAR(20) DEFAULT 'personal'
            CHECK (user_type IN ('corporate', 'personal', 'admin'));
          END IF;
        END $$;
      `
    });

    if (userTypeError) {
      console.log('   user_typeカラムは既に存在します');
    } else {
      console.log('   ✅ user_typeカラムを追加しました');
    }

    // 2. 企業向けフィールドを追加
    console.log('2. 企業向けフィールドを追加中...');

    // representative カラム
    const { error: repError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='representative'
          ) THEN
            ALTER TABLE public.users ADD COLUMN representative VARCHAR(255);
          END IF;
        END $$;
      `
    });

    // business_type カラム
    const { error: bizError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='business_type'
          ) THEN
            ALTER TABLE public.users ADD COLUMN business_type VARCHAR(255);
          END IF;
        END $$;
      `
    });

    console.log('   ✅ 企業向けフィールドを追加しました');

    // 3. 個人向けフィールドを追加
    console.log('3. 個人向けフィールドを追加中...');

    // nickname カラム
    const { error: nickError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='nickname'
          ) THEN
            ALTER TABLE public.users ADD COLUMN nickname VARCHAR(100);
          END IF;
        END $$;
      `
    });

    // social_media カラム
    const { error: socialError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='social_media'
          ) THEN
            ALTER TABLE public.users ADD COLUMN social_media VARCHAR(255);
          END IF;
        END $$;
      `
    });

    console.log('   ✅ 個人向けフィールドを追加しました');

    // 4. website フィールドを追加（両方のタイプで使用）
    console.log('4. websiteフィールドを追加中...');
    const { error: websiteError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name='users' AND column_name='website'
          ) THEN
            ALTER TABLE public.users ADD COLUMN website VARCHAR(255);
          END IF;
        END $$;
      `
    });

    console.log('   ✅ websiteフィールドを追加しました');

    // 5. 既存ユーザーのuser_typeを更新
    console.log('5. 既存ユーザーのuser_typeを更新中...');

    // 管理者ユーザーを'admin'に設定
    const { error: adminUpdateError } = await supabase
      .from('users')
      .update({ user_type: 'admin' })
      .eq('role', 'admin');

    if (adminUpdateError) {
      console.error('   ❌ 管理者ユーザーの更新でエラー:', adminUpdateError);
    } else {
      console.log('   ✅ 管理者ユーザーをadminタイプに設定しました');
    }

    // その他のユーザーを'personal'に設定
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ user_type: 'personal' })
      .neq('role', 'admin')
      .is('user_type', null);

    if (userUpdateError) {
      console.error('   ❌ 一般ユーザーの更新でエラー:', userUpdateError);
    } else {
      console.log('   ✅ 一般ユーザーをpersonalタイプに設定しました');
    }

    // 6. 現在のユーザー状況を確認
    console.log('6. 更新後のユーザー状況を確認中...');
    const { data: users, error: selectError } = await supabase
      .from('users')
      .select('id, email, name, role, user_type, representative, business_type, nickname, website')
      .order('created_at', { ascending: true });

    if (selectError) {
      console.error('   ❌ ユーザー情報の取得でエラー:', selectError);
    } else {
      console.log('   📊 現在のユーザー一覧:');
      users.forEach(user => {
        console.log(`     - ${user.email}: role=${user.role}, user_type=${user.user_type}`);
      });
    }

    console.log('\n✅ スキーママイグレーションが完了しました！');

  } catch (err) {
    console.error('❌ 予期しないエラー:', err);
  }
}

// 実行
migrateUserSchema();