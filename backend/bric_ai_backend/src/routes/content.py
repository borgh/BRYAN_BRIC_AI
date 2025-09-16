from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.user import User, db

content_bp = Blueprint('content', __name__)

# Dados de exemplo para demonstração
SAMPLE_CONTENT = {
    'courses': [
        {
            'id': 1,
            'title': 'Matemática Avançada',
            'description': 'Curso completo de cálculo e álgebra linear',
            'progress': 65,
            'total_lessons': 24,
            'completed_lessons': 16,
            'category': 'Exatas'
        },
        {
            'id': 2,
            'title': 'Programação Python',
            'description': 'Aprenda Python do básico ao avançado',
            'progress': 40,
            'total_lessons': 30,
            'completed_lessons': 12,
            'category': 'Tecnologia'
        },
        {
            'id': 3,
            'title': 'História do Brasil',
            'description': 'História completa do Brasil colonial ao contemporâneo',
            'progress': 80,
            'total_lessons': 20,
            'completed_lessons': 16,
            'category': 'Humanas'
        }
    ],
    'lessons': {
        1: [
            {
                'id': 101,
                'title': 'Introdução ao Cálculo',
                'content': 'O cálculo é uma ferramenta matemática fundamental...',
                'type': 'text',
                'duration': 15,
                'completed': True
            },
            {
                'id': 102,
                'title': 'Limites e Continuidade',
                'content': 'Um limite descreve o comportamento de uma função...',
                'type': 'video',
                'duration': 25,
                'completed': True
            },
            {
                'id': 103,
                'title': 'Derivadas',
                'content': 'A derivada mede a taxa de variação instantânea...',
                'type': 'interactive',
                'duration': 30,
                'completed': False
            }
        ]
    },
    'achievements': [
        {
            'id': 1,
            'title': 'Primeiro Login',
            'description': 'Bem-vindo ao BRIC AI!',
            'icon': '🎉',
            'earned': True,
            'emeralds': 10
        },
        {
            'id': 2,
            'title': 'Estudante Dedicado',
            'description': 'Complete 5 lições em um dia',
            'icon': '📚',
            'earned': False,
            'emeralds': 50
        },
        {
            'id': 3,
            'title': 'Sequência de Estudos',
            'description': 'Estude por 7 dias consecutivos',
            'icon': '🔥',
            'earned': False,
            'emeralds': 100
        }
    ]
}

@content_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        # Personalizar conteúdo baseado no estilo de aprendizagem
        personalized_content = []
        for course in SAMPLE_CONTENT['courses']:
            course_copy = course.copy()
            if user.learning_style == 'visual':
                course_copy['recommended_format'] = 'Mapas mentais e diagramas'
            elif user.learning_style == 'auditory':
                course_copy['recommended_format'] = 'Podcasts e explicações em áudio'
            elif user.learning_style == 'kinesthetic':
                course_copy['recommended_format'] = 'Exercícios práticos e simulações'
            else:  # reading
                course_copy['recommended_format'] = 'Textos e resumos detalhados'
            
            personalized_content.append(course_copy)
        
        dashboard_data = {
            'user': user.to_dict(),
            'courses': personalized_content,
            'recent_achievements': SAMPLE_CONTENT['achievements'][:2],
            'study_stats': {
                'total_study_time': 120,  # minutos
                'lessons_completed_today': 3,
                'current_streak': user.study_streak,
                'weekly_goal_progress': 75
            }
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
    try:
        return jsonify(SAMPLE_CONTENT['courses']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/courses/<int:course_id>/lessons', methods=['GET'])
@jwt_required()
def get_course_lessons(course_id):
    try:
        lessons = SAMPLE_CONTENT['lessons'].get(course_id, [])
        return jsonify(lessons), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/achievements', methods=['GET'])
@jwt_required()
def get_achievements():
    try:
        return jsonify(SAMPLE_CONTENT['achievements']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@content_bp.route('/study-session', methods=['POST'])
@jwt_required()
def complete_study_session():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Usuário não encontrado'}), 404
        
        data = request.json
        emeralds_earned = data.get('emeralds', 10)
        
        # Atualizar estatísticas do usuário
        user.emeralds += emeralds_earned
        user.study_streak += 1
        
        # Verificar se subiu de nível (a cada 100 esmeraldas)
        new_level = (user.emeralds // 100) + 1
        level_up = new_level > user.level
        user.level = new_level
        
        db.session.commit()
        
        response = {
            'message': 'Sessão de estudo concluída!',
            'emeralds_earned': emeralds_earned,
            'total_emeralds': user.emeralds,
            'current_level': user.level,
            'level_up': level_up,
            'study_streak': user.study_streak
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

