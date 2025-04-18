document.addEventListener('DOMContentLoaded', function() {
    const breakupBtn = document.getElementById('breakup-btn');
    const forgiveBtn = document.getElementById('forgive-btn');
    const container = document.querySelector('.container');
    const backgroundSlideshow = document.getElementById('background-slideshow');

    // Inicializa o slideshow de fundo
    setupBackgroundSlideshow();

    // Função para fazer o botão fugir
    breakupBtn.addEventListener('mouseover', moveButton);
    breakupBtn.addEventListener('click', moveButton);
    
    // Função para quando clicar no botão de perdoar
    forgiveBtn.addEventListener('click', celebrate);

    function moveButton() {
        // Definindo margens de segurança para evitar que o botão saia da tela
        const safeMargin = 20; // pixels de margem de segurança das bordas
        const centerAvoidanceRadius = 150; // pixels para evitar o centro
        
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const buttonWidth = breakupBtn.offsetWidth;
        const buttonHeight = breakupBtn.offsetHeight;
        
        // Limites seguros para posicionamento
        const minX = safeMargin;
        const maxX = screenWidth - buttonWidth - safeMargin;
        const minY = safeMargin;
        const maxY = screenHeight - buttonHeight - safeMargin;
        
        // Centro da tela
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;
        
        // Gera posições aleatórias dentro da janela
        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 20; // Limite máximo de tentativas para evitar loop infinito
        
        do {
            randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
            randomY = Math.floor(Math.random() * (maxY - minY)) + minY;
            
            // Calcula distância do centro
            const distanceFromCenter = Math.sqrt(
                Math.pow(randomX + buttonWidth/2 - centerX, 2) +
                Math.pow(randomY + buttonHeight/2 - centerY, 2)
            );
            
            attempts++;
            
            // Se estiver longe o suficiente do centro ou atingiu número máximo de tentativas
            if (distanceFromCenter > centerAvoidanceRadius || attempts >= maxAttempts) {
                break;
            }
        } while (true);
        
        // Move o botão para a nova posição
        breakupBtn.style.position = 'fixed';
        breakupBtn.style.left = `${randomX}px`;
        breakupBtn.style.top = `${randomY}px`;
        breakupBtn.style.zIndex = '10';
        
        // Adiciona uma mensagem divertida
        const messages = [
            "😱 Nããão! Tem muito tushi ainda! 🍣",
            "✈️ E as viagens? tá doida é? 🏖️",
            "🍔 E a gente já zerou os restaurantes de SP foi? 🍕",
            "🙄 Vá se aquietar!",
            "Tu me ama que eu sei! 💕",
            "🎂 Tá chegando 1 ano minha fia! 🥺",
            "🎬 Muito filme de terror ainda! 👻",
            "💔 E a minha vida, fica como? 😭"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Define estilos aleatórios para cada mensagem
        const styles = [
            {
                bg: 'linear-gradient(45deg, rgba(255,105,180,0.8), rgba(147,112,219,0.8))',
                rotate: 'rotate(-3deg)',
                animation: 'bounce 0.5s ease'
            },
            {
                bg: 'linear-gradient(45deg, rgba(255,69,0,0.8), rgba(255,215,0,0.8))',
                rotate: 'rotate(2deg)',
                animation: 'wobble 0.7s ease'
            },
            {
                bg: 'linear-gradient(45deg, rgba(0,191,255,0.8), rgba(138,43,226,0.8))',
                rotate: 'rotate(-2deg)',
                animation: 'tada 0.6s ease'
            },
            {
                bg: 'linear-gradient(45deg, rgba(50,205,50,0.8), rgba(0,206,209,0.8))',
                rotate: 'rotate(3deg)',
                animation: 'swing 0.5s ease'
            }
        ];
        
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        
        // Cria um elemento para a mensagem
        const msgElement = document.createElement('p');
        msgElement.textContent = randomMessage;
        msgElement.style.position = 'fixed';
        
        // Posiciona a mensagem próxima ao botão que fugiu
        const positionNearButton = Math.random() > 0.5;
        
        if (positionNearButton) {
            // 50% de chance de aparecer próximo ao botão
            msgElement.style.left = `${randomX + buttonWidth/2}px`;
            msgElement.style.top = `${randomY - 60}px`;
            msgElement.style.transform = 'translateX(-50%)';
        } else {
            // 50% de chance de aparecer em posição aleatória na tela
            const msgX = Math.random() * (window.innerWidth - 200) + 100;
            const msgY = Math.random() * (window.innerHeight - 200) + 100;
            msgElement.style.left = `${msgX}px`;
            msgElement.style.top = `${msgY}px`;
            msgElement.style.transform = randomStyle.rotate;
        }
        
        // Estiliza a mensagem
        msgElement.style.color = '#ffffff';
        msgElement.style.fontWeight = 'bold';
        msgElement.style.fontSize = '22px';
        msgElement.style.padding = '15px 20px';
        msgElement.style.background = randomStyle.bg;
        msgElement.style.borderRadius = '15px';
        msgElement.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        msgElement.style.zIndex = '1000';
        msgElement.style.textShadow = '1px 1px 3px #000';
        msgElement.style.textAlign = 'center';
        msgElement.style.maxWidth = '90%';
        msgElement.style.transition = 'all 0.3s ease';
        
        // Cria animação de entrada e saída personalizada
        const keyframes = `
            @keyframes ${randomStyle.animation.split(' ')[0]} {
                0% { opacity: 0; transform: scale(0.7) ${randomStyle.rotate}; }
                50% { opacity: 1; transform: scale(1.1) ${randomStyle.rotate}; }
                70% { transform: scale(0.95) ${randomStyle.rotate}; }
                100% { transform: scale(1) ${randomStyle.rotate}; opacity: 1; }
            }
            @keyframes fadeOutCustom {
                0% { opacity: 1; transform: scale(1) ${randomStyle.rotate}; }
                80% { opacity: 1; transform: scale(1.05) ${randomStyle.rotate}; }
                100% { opacity: 0; transform: scale(0.9) ${randomStyle.rotate}; }
            }
        `;
        
        // Adiciona a animação ao documento
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
        
        msgElement.style.animation = `${randomStyle.animation}, fadeOutCustom 2s 0.5s forwards`;
        
        // Adiciona a mensagem ao corpo do documento
        document.body.appendChild(msgElement);
        
        // Remove a mensagem e o estilo após a animação
        setTimeout(() => {
            document.body.removeChild(msgElement);
            document.head.removeChild(styleElement);
        }, 2500);
    }

    function celebrate() {
        // Remove os botões
        const buttonsContainer = document.querySelector('.buttons-container');
        buttonsContainer.style.display = 'none';
        
        // Mostra mensagem de celebração
        const message = document.createElement('p');
        message.textContent = '🎉 Parabéns! Escolha correta! 🎉';
        message.classList.add('success-message');
        container.appendChild(message);
        
        // Adiciona opções de prêmios
        setTimeout(() => {
            const rewardsTitle = document.createElement('p');
            rewardsTitle.textContent = 'Escolha seu prêmio:';
            rewardsTitle.classList.add('rewards-title');
            container.appendChild(rewardsTitle);
            
            const rewardsContainer = document.createElement('div');
            rewardsContainer.classList.add('rewards-container');
            
            const rewards = [
                { text: '🍣 Vale Tushi', value: 'sushi' },
                { text: '🍰 Vale Bolo de chocolate', value: 'bolo' },
                { text: '🍕 Vale Pizza', value: 'pizza' },
            ];
            
            rewards.forEach(reward => {
                const rewardButton = document.createElement('button');
                rewardButton.textContent = reward.text;
                rewardButton.classList.add('reward-btn');
                rewardButton.dataset.reward = reward.value;
                
                rewardButton.addEventListener('click', function() {
                    // Remove os outros botões
                    rewardsContainer.style.display = 'none';
                    rewardsTitle.style.display = 'none';
                    
                    // Mostra mensagem personalizada
                    const finalMessage = document.createElement('p');
                    finalMessage.classList.add('final-message');
                    
                    switch(reward.value) {
                        case 'sushi':
                            finalMessage.textContent = '🍣 Tushi garantido pra hoje';
                            break;
                        case 'bolo':
                            finalMessage.textContent = '🍰 Aquele bolo de chocolate lá, coma duma vez não';
                            break;
                        case 'pizza':
                            finalMessage.textContent = '🍕 Tem que ter a pizza doce também né, vai chegar!';
                            break;
                    }
                    
                    container.appendChild(finalMessage);
                    
                    // Adiciona instrução para tirar screenshot
                    setTimeout(() => {
                        const screenshotMsg = document.createElement('p');
                        screenshotMsg.innerHTML = 'Tira um print dessa tela e envia pra mim! 📱';
                        screenshotMsg.classList.add('screenshot-msg');
                        container.appendChild(screenshotMsg);
                    }, 1500);
                    
                    // Segundo conjunto de confetes para comemorar a escolha
                    createEvenMoreConfetti();
                });
                
                rewardsContainer.appendChild(rewardButton);
            });
            
            container.appendChild(rewardsContainer);
        }, 1500);
        
        // Cria confetes contínuos
        createContinuousConfetti();
    }

    // Nova função para criar confetes que não param
    function createContinuousConfetti() {
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.innerHTML = ''; // Limpa confetes anteriores
        
        // Cria o primeiro lote de confetes
        createConfettiWave();
        
        // Continua criando novos lotes de confetes
        function createConfettiWave() {
            const colors = ['#ff4081', '#4caf50', '#2196F3', '#FFEB3B', '#9C27B0', '#FF9800', '#00BCD4'];
            
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.classList.add('confetti');
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = `${Math.random() * 100}%`;
                    confetti.style.top = `-10px`;
                    confetti.style.width = `${Math.random() * 10 + 5}px`;
                    confetti.style.height = `${Math.random() * 10 + 5}px`;
                    confetti.style.opacity = '1';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    
                    confettiContainer.appendChild(confetti);
                    
                    // Animação do confete
                    const duration = Math.random() * 4 + 2;
                    const leftOffset = (Math.random() - 0.5) * window.innerWidth * 0.7;
                    
                    confetti.animate([
                        { transform: 'translate(0, 0)', opacity: 1 },
                        { transform: `translate(${leftOffset}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0.3 }
                    ], {
                        duration: duration * 1000,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                    
                    setTimeout(() => {
                        confettiContainer.removeChild(confetti);
                    }, duration * 1000);
                }, Math.random() * 1500); // Distribuição ao longo de 1.5 segundos
            }
            
            // Continua gerando confetes
            setTimeout(createConfettiWave, 1500);
        }
    }
    
    // Função para criar ainda mais confetes para a escolha do prêmio
    function createEvenMoreConfetti() {
        const colors = ['#ff4081', '#4caf50', '#2196F3', '#FFEB3B', '#9C27B0', '#FF9800'];
        
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = `${Math.random() * 15 + 7}px`;
                confetti.style.height = `${Math.random() * 15 + 7}px`;
                confetti.style.opacity = '1';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.zIndex = '1000';
                
                // Posiciona confete em posição aleatória na tela
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `${Math.random() * 100}%`;
                
                document.body.appendChild(confetti);
                
                // Animação de aparecimento e desaparecimento
                confetti.animate([
                    { transform: 'scale(0) rotate(0deg)', opacity: 0 },
                    { transform: 'scale(1) rotate(180deg)', opacity: 1, offset: 0.5 },
                    { transform: 'scale(0) rotate(360deg)', opacity: 0 }
                ], {
                    duration: 2000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                setTimeout(() => {
                    document.body.removeChild(confetti);
                }, 2000);
            }, Math.random() * 2000);
        }
    }

    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#ff4081', '#4caf50', '#2196F3', '#FFEB3B', '#9C27B0'];
        
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `-10px`;
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.opacity = '1';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            confettiContainer.appendChild(confetti);
            
            // Animação do confete
            const duration = Math.random() * 3 + 2;
            const leftOffset = (Math.random() - 0.5) * 300;
            
            confetti.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${leftOffset}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            setTimeout(() => {
                confettiContainer.removeChild(confetti);
            }, duration * 1000);
        }
    }

    // Nova função para configurar o slideshow de imagens de fundo
    function setupBackgroundSlideshow() {
        // Tenta encontrar diferentes formatos de imagem na pasta
        async function checkImage(url) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        }

        // Função para carregar as imagens disponíveis
        async function loadAvailableImages() {
            const validImages = [];
            
            // Tenta encontrar imagens com diferentes padrões de nome
            for (let i = 1; i <= 11; i++) {
                const paths = [
                    `images/img${i}.jpeg`,
                ];
                
                for (const path of paths) {
                    if (await checkImage(path)) {
                        validImages.push(path);
                        break;
                    }
                }
            }
            
            return validImages;
        }

        // Inicializa o slideshow
        loadAvailableImages().then(images => {
            if (images.length === 0) {
                console.log('Nenhuma imagem encontrada na pasta images, usando apenas o gradiente de fundo.');
                return;
            }

            let currentImageIndex = 0;
            
            // Função para adicionar uma nova imagem ao slideshow
            function addImageToSlideshow(imageSrc, isActive = false) {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.classList.add('background-image');
                if (isActive) img.classList.add('active');
                backgroundSlideshow.appendChild(img);
                return img;
            }
            
            // Adiciona a primeira imagem
            addImageToSlideshow(images[0], true);
            
            // Função para mudar para a próxima imagem
            function nextImage() {
                const oldImage = backgroundSlideshow.querySelector('.active');
                currentImageIndex = (currentImageIndex + 1) % images.length;
                
                // Adiciona nova imagem
                const newImage = addImageToSlideshow(images[currentImageIndex], true);
                
                // Remove classe active da imagem antiga
                if (oldImage) {
                    oldImage.classList.remove('active');
                    // Remove a imagem antiga após a transição completar
                    setTimeout(() => {
                        oldImage.remove();
                    }, 2000); // Espera o tempo da transição (2s)
                }
            }
            
            // Muda a imagem a cada 3 segundos
            setInterval(nextImage, 3000);
        });
    }

    // Para dispositivos móveis, adicione evento de toque
    if ('ontouchstart' in window) {
        breakupBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Previne o comportamento padrão
            moveButton();
        });
    }
});