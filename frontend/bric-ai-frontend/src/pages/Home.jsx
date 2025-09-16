import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Brain, 
  Users, 
  Trophy, 
  Clock, 
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'Personalização Inteligente',
      description: 'IA que adapta conteúdo e método de apresentação ao seu estilo de aprendizagem único.'
    },
    {
      icon: Clock,
      title: 'Otimização do Tempo',
      description: 'Técnicas avançadas para absorver conteúdos densos de forma mais rápida e eficiente.'
    },
    {
      icon: Users,
      title: 'Comunidade Colaborativa',
      description: 'Ambiente para compartilhamento de conhecimento e materiais entre estudantes.'
    },
    {
      icon: Trophy,
      title: 'Gamificação Significativa',
      description: 'Sistema de recompensas que estimula o progresso contínuo e celebra conquistas.'
    }
  ];

  const personas = [
    {
      name: 'Mariana Silva',
      age: '22 anos, Medicina',
      description: 'Dedicada e organizada, mas constantemente sobrecarregada com a quantidade de conteúdo.',
      quote: 'Quero uma ferramenta que me ajude a estudar de forma mais inteligente, não apenas mais horas.'
    },
    {
      name: 'Rafael Oliveira',
      age: '28 anos, Programação',
      description: 'Profissional em transição de carreira, pouco tempo disponível, autodidata.',
      quote: 'Preciso de uma plataforma que entenda exatamente o que preciso aprender e me mantenha no caminho certo.'
    },
    {
      name: 'Júlia Mendes',
      age: '19 anos, Engenharia',
      description: 'Caloura entusiasmada, criativa e social, mas com dificuldade em manter o foco.',
      quote: 'Preciso de algo que torne o estudo mais divertido e me ajude a não perder o foco.'
    }
  ];

  const benefits = [
    'Personalização multidimensional adaptada ao estilo de aprendizagem',
    'Otimização inteligente do tempo com IA',
    'Comunidade colaborativa para compartilhamento de conhecimento',
    'Gamificação significativa para manter o engajamento'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Construindo HOJE, o seu conhecimento</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                BRIC AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Uma plataforma educacional inovadora que utiliza inteligência artificial para 
              personalizar e otimizar sua experiência de aprendizado
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold" asChild>
              <Link to="/register">
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg" asChild>
              <Link to="/login">
                Já tenho conta
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">87%</div>
              <div className="text-blue-100">dos estudantes consideram a falta de tempo um desafio significativo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">65%</div>
              <div className="text-blue-100">abandonam plataformas por falta de engajamento</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">73%</div>
              <div className="text-blue-100">acreditam que seu estilo de aprendizagem não é bem atendido</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              A Solução BRIC AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformamos os desafios do aprendizado moderno em oportunidades de crescimento 
              através da inteligência artificial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Por que escolher o BRIC AI?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nossa plataforma vai além da personalização tradicional, oferecendo uma 
                experiência de aprendizado verdadeiramente adaptativa e envolvente.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Resultados Comprovados</h3>
                <p className="text-gray-600">Veja o impacto do BRIC AI no aprendizado</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">+40%</div>
                  <div className="text-sm text-gray-600">Eficiência no estudo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">+60%</div>
                  <div className="text-sm text-gray-600">Retenção de conteúdo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">+85%</div>
                  <div className="text-sm text-gray-600">Engajamento</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">-50%</div>
                  <div className="text-sm text-gray-600">Tempo de estudo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Feito para Você
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos perfis de estudantes que já transformaram 
              sua experiência de aprendizado com o BRIC AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-600">
                    {persona.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500 font-medium">
                    {persona.age}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    {persona.description}
                  </p>
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                    "{persona.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para transformar seu aprendizado?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de estudantes que já descobriram uma forma mais 
            inteligente e eficiente de aprender
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold" asChild>
              <Link to="/register">
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg" asChild>
              <Link to="/login">
                Fazer Login
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

