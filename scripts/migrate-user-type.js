const { createClient } = require('@supabase/supabase-js');

// Supabase設定
const supabaseUrl = 'https://ugjpcfcuswncrmrxlokn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnanBjZmN1c3duY3Jtcnhsb2tuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA5MTM1NCwiZXhwIjoyMDczNjY3MzU0fQ.pNRnXw_ekqSVkeUMFqt_E1xP-qzpBGg-mHnv_I_cgxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateUserType() {
  console.log('🔄 user_typeカラムのマイグレーションを開始します...\n');

  try {
    // 1. user_typeカラムを追加（既に存在する場合はスキップ）
    console.log('1. user_typeカラムを追加中...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
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

    if (alterError) {
      console.log('   カラムは既に存在します:', alterError.message);
    } else {
      console.log('   ✅ user_typeカラムを追加しました');
    }

    // 2. 既存ユーザーのuser_typeを更新
    console.log('2. 既存ユーザーのuser_typeを更新中...');

    // 管理者ユーザーを'admin'に設定
    const { error: adminError } = await supabase
      .from('users')
      .update({ user_type: 'admin' })
      .eq('role', 'admin');

    if (adminError) {
      console.error('   ❌ 管理者ユーザーの更新でエラー:', adminError);
    } else {
      console.log('   ✅ 管理者ユーザーをadminタイプに設定しました');
    }

    // その他のユーザーを'personal'に設定
    const { error: userError } = await supabase
      .from('users')
      .update({ user_type: 'personal' })
      .neq('role', 'admin')
      .is('user_type', null);

    if (userError) {
      console.error('   ❌ 一般ユーザーの更新でエラー:', userError);
    } else {
      console.log('   ✅ 一般ユーザーをpersonalタイプに設定しました');
    }

    // 3. 現在のユーザー状況を確認
    console.log('3. 更新後のユーザー状況を確認中...');
    const { data: users, error: selectError } = await supabase
      .from('users')
      .select('email, role, user_type')
      .order('created_at', { ascending: true });

    if (selectError) {
      console.error('   ❌ ユーザー情報の取得でエラー:', selectError);
    } else {
      console.log('   📊 現在のユーザー一覧:');
      users.forEach(user => {
        console.log(`     - ${user.email}: role=${user.role}, user_type=${user.user_type}`);
      });
    }

    console.log('\n✅ マイグレーションが完了しました！');

  } catch (err) {
    console.error('❌ 予期しないエラー:', err);
  }
}

// 実行
migrateUserType();