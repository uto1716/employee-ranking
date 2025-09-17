const { createClient } = require('@supabase/supabase-js');

// Supabase設定
const supabaseUrl = 'https://ugjpcfcuswncrmrxlokn.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnanBjZmN1c3duY3Jtcnhsb2tuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA5MTM1NCwiZXhwIjoyMDczNjY3MzU0fQ.pNRnXw_ekqSVkeUMFqt_E1xP-qzpBGg-mHnv_I_cgxM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getAllUsers() {
  console.log('📊 全ユーザー一覧を取得中...\n');

  try {
    // usersテーブルから全データ取得
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ エラー:', error);
      return;
    }

    if (users && users.length > 0) {
      console.log(`✅ ${users.length}件のユーザーが見つかりました:\n`);
      console.log('━'.repeat(80));

      users.forEach((user, index) => {
        console.log(`\n【ユーザー ${index + 1}】`);
        console.log(`  ID:         ${user.id}`);
        console.log(`  Email:      ${user.email}`);
        console.log(`  名前:       ${user.name || '未設定'}`);
        console.log(`  役割:       ${user.role}`);
        console.log(`  パスワード: ${user.password_hash ? 'ハッシュ済み' : 'デフォルト'}`);
        console.log(`  作成日時:   ${new Date(user.created_at).toLocaleString('ja-JP')}`);
        console.log(`  更新日時:   ${new Date(user.updated_at).toLocaleString('ja-JP')}`);
      });

      console.log('\n' + '━'.repeat(80));
      console.log('\n📈 統計情報:');
      console.log(`  総ユーザー数: ${users.length}`);
      console.log(`  管理者数:     ${users.filter(u => u.role === 'admin').length}`);
      console.log(`  一般ユーザー: ${users.filter(u => u.role === 'user').length}`);

    } else {
      console.log('⚠️  ユーザーが登録されていません');
    }

  } catch (err) {
    console.error('❌ 予期しないエラー:', err);
  }
}

// 実行
getAllUsers();