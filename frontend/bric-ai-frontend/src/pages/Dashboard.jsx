import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target, 
  Gem, 
  TrendingUp,
  Calendar,
  Play,
  Star,
  Users,
  Brain,
  Zap
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeStudySession = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/study-session', 
        { emeralds: 15 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Atualizar dados do usuário no localStorage
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Recarregar dashboard
      fetchDashboardData();
    } catch (error) {
      console.error('Erro ao completar sessão:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  const data = dashboardData || {};
  const courses = data.courses || [];
  const achievements = data.recent_achievements || [];
  const stats = data.study_stats || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user?.username}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta ao seu painel de aprendizado personalizado
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Nível Atual</p>
                  <p className="text-3xl font-bold">{user?.level || 1}</p>
                </div>
                <Star className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Esmeraldas</p>
                  <p className="text-3xl font-bold">{user?.emeralds || 0}</p>
                </div>
                <Gem className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Sequência</p>
                  <p className="text-3xl font-bold">{stats.current_streak || 0} dias</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Tempo Hoje</p>
                  <p className="text-3xl font-bold">{stats.total_study_time || 0}min</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span>Ações Rápidas</span>
                </CardTitle>
                <CardDescription>
                  Continue seu aprendizado de onde parou
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={completeStudySession}
                  >
                    <div className="text-center">
                      <Play className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Iniciar Sessão de Estudo</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16">
                    <div className="text-center">
                      <Brain className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-sm">Revisão Inteligente</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Courses Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Seus Cursos</span>
                </CardTitle>
                <CardDescription>
                  Acompanhe seu progresso nos cursos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <Badge variant="secondary">{course.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {course.completed_lessons}/{course.total_lessons} lições
                      </span>
                      <span className="text-sm font-medium text-blue-600">
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    {course.recommended_format && (
                      <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        💡 Recomendado: {course.recommended_format}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Estatísticas de Estudo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {stats.lessons_completed_today || 0}
                    </div>
                    <div className="text-sm text-gray-600">Lições hoje</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {stats.weekly_goal_progress || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Meta semanal</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progresso da meta semanal</span>
                    <span className="text-sm font-medium">{stats.weekly_goal_progress || 0}%</span>
                  </div>
                  <Progress value={stats.weekly_goal_progress || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Style */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span>Seu Perfil</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Estilo: {user?.learning_style === 'visual' ? 'Visual' : 
                             user?.learning_style === 'auditory' ? 'Auditivo' :
                             user?.learning_style === 'kinesthetic' ? 'Cinestésico' : 'Leitura'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {user?.learning_style === 'visual' && 'Você aprende melhor com recursos visuais'}
                    {user?.learning_style === 'auditory' && 'Você aprende melhor ouvindo explicações'}
                    {user?.learning_style === 'kinesthetic' && 'Você aprende melhor fazendo e praticando'}
                    {user?.learning_style === 'reading' && 'Você aprende melhor lendo textos detalhados'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-blue-600" />
                  <span>Conquistas Recentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Gem className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-yellow-600">+{achievement.emeralds}</span>
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Conquistado
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Activity */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Atividade da Comunidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>João Silva</strong> compartilhou um resumo de Física
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Maria Santos</strong> fez uma pergunta sobre Cálculo
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Pedro Costa</strong> completou o curso de Python
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver mais atividades
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

