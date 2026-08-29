// EQUIPMENT DATASET FROM REFERENCE PDF
        const galleryData = {
            conveyors: {
                category: 'A. CONVEYORS',
                title: 'Conveyors',
                count: '7 Items',
                items: [
                    { img: 'imagesss/belt conveyor.png', index: '01', name: 'Belt Conveyors', pdfName: '1. BELT CONVEYORS' },
                    { img: 'imagesss/Slider Belt Conveyor.png', index: '02', name: 'Slider Belt Conveyors', pdfName: '2. SLIDER BELT CONVEYORS' },
                    { img: 'imagesss/Telescopic Belt Conveyor.png', index: '03', name: 'Telescopic Belt Conveyor', pdfName: '3. TELESCOPIC BELT CONVEYOR' },
                    { img: 'imagesss/Tripper Conveyor.png', index: '04', name: 'Tripper Conveyor', pdfName: '4. TRIPPER CONVEYOR' },
                    { img: 'imagesss/Screw Conveyor.png', index: '05', name: 'Screw Conveyors', pdfName: '5. SCREW CONVEYORS' },
                    { img: 'imagesss/Chain Conveyor.png', index: '06', name: 'Chain Conveyors', pdfName: '6. CHAIN CONVEYORS' },
                    { img: 'imagesss/Bucket Elevator.png', index: '07', name: 'Bucket Elevators', pdfName: '7. BUCKET ELEVATORS' }
                ]
            },
            feeders: {
                category: 'B. FEEDERS',
                title: 'Feeders',
                count: '3 Items',
                items: [
                    { img: 'imagesss/Belt Feeder.png', index: '01', name: 'Belt Feeders', pdfName: '1. BELT FEEDERS' },
                    { img: 'imagesss/Screw Feeder.png', index: '02', name: 'Screw Feeders', pdfName: '2. SCREW FEEDERS' },
                    { img: 'imagesss/Rotary Air Lock Feeder.png', index: '03', name: 'Rotary Air Lock Feeder', pdfName: '3. ROTARY AIR LOCK FEEDER' }
                ]
            },
            loaders: {
                category: 'C. LOADERS',
                title: 'Loaders',
                count: '2 Items',
                items: [
                    { img: 'imagesss/Mobile Bag Stacker.png', index: '01', name: 'Mobile Bag Stacker', pdfName: '1. MOBILE BAG STACKER' },
                    { img: 'imagesss/ship loader.png', index: '02', name: 'Lorry / Ship Loader', pdfName: '2. SHIP / LORRY LOADER' }
                ]
            },
            storage: {
                category: 'D. STORAGE EQUIPMENTS',
                title: 'Storage Equipments',
                count: '1 Item',
                items: [
                    { img: 'imagesss/Hopper  Silo.png', index: '01', name: 'Hopper / Silo', pdfName: '1. HOPPER / SILO' }
                ]
            },
            gates: {
                category: 'E. GATES',
                title: 'Industrial Gates',
                count: '3 Items',
                items: [
                    { img: 'imagesss/Divertor Gate.png', index: '01', name: 'Divertor Gate', pdfName: '1. DIVERTOR GATE' },
                    { img: 'imagesss/Slider Gate.png', index: '02', name: 'Slider Gate', pdfName: '2. SLIDER GATE' },
                    { img: 'imagesss/rod gate.png', index: '03', name: 'Rod Gate', pdfName: '3. ROD GATE' }
                ]
            },
            fabrication: {
                category: 'CUSTOM FABRICATION',
                title: 'Custom Fabrication',
                count: '2 Items',
                items: [
                    { img: 'images/what we do (3).png', index: '01', name: 'Custom Industrial Fabrication', pdfName: 'HEAVY CUSTOM FABRICATION' },
                    { img: 'imagesss/Hopper  Silo.png', index: '02', name: 'Chutes & Structure Fabrication', pdfName: 'CHUTES & STRUCTURAL HOPPERS' }
                ]
            },
            spares: {
                category: 'F. SPARES',
                title: 'Conveyor Spares',
                count: '2 Items',
                items: [
                    { img: 'imagesss/Conveyor Rollers.png', index: '01', name: 'Conveyor Rollers', pdfName: '1. CONVEYOR ROLLERS' },
                    { img: 'imagesss/Conveyor Pulleys.png', index: '02', name: 'Conveyor Pulleys', pdfName: '2. CONVEYOR PULLEYS' }
                ]
            }
        };

        // 50vw x 50vh EXPANDED HOVER GALLERY LOGIC
        let hoverCloseTimer = null;
        let activeCategory = null;

        function showExpandedGallery(categoryKey) {
            clearTimeout(hoverCloseTimer);
            const data = galleryData[categoryKey];
            if (!data) return;

            activeCategory = categoryKey;
            document.getElementById('exp-category').textContent = data.category;
            document.getElementById('exp-title').textContent = data.title;
            document.getElementById('exp-count').textContent = data.count;

            const grid = document.getElementById('exp-items-grid');
            grid.innerHTML = '';

            data.items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'exp-item-card';
                card.style.animationDelay = `${index * 40}ms`;
                card.onclick = (e) => {
                    e.stopPropagation();
                    openLightbox(item.img, item.pdfName, data.category);
                };

                card.innerHTML = `
                    <div class="exp-thumb-wrap">
                        <img src="${item.img}" alt="${item.name}" loading="lazy">
                    </div>
                    <div class="exp-item-details">
                        <span class="exp-item-index">${item.index}</span>
                        <span class="exp-item-label">${item.name}</span>
                    </div>
                `;
                grid.appendChild(card);
            });

            document.getElementById('expanded-gallery-backdrop').classList.add('is-active');
            document.getElementById('expanded-gallery-modal').classList.add('is-active');
        }

        function closeExpandedGallery() {
            clearTimeout(hoverCloseTimer);
            activeCategory = null;
            const backdrop = document.getElementById('expanded-gallery-backdrop');
            const modal = document.getElementById('expanded-gallery-modal');
            if (backdrop) backdrop.classList.remove('is-active');
            if (modal) modal.classList.remove('is-active');
        }

        function scheduleCloseExpandedGallery() {
            clearTimeout(hoverCloseTimer);
            hoverCloseTimer = setTimeout(() => {
                closeExpandedGallery();
            }, 280);
        }

        function keepExpandedGalleryOpen() {
            clearTimeout(hoverCloseTimer);
        }

        // Lightbox Functions
        function openLightbox(imageSrc, title, category) {
            const modal = document.getElementById('equipment-lightbox');
            const img = document.getElementById('lightbox-img');
            const titleEl = document.getElementById('lightbox-title');
            const catEl = document.getElementById('lightbox-category');

            if (modal && img && titleEl && catEl) {
                img.src = imageSrc;
                img.alt = title;
                titleEl.textContent = title;
                catEl.textContent = category || 'EQUIPMENT PREVIEW';
                modal.classList.add('is-active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeLightbox() {
            const modal = document.getElementById('equipment-lightbox');
            if (modal) {
                modal.classList.remove('is-active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }

        function handleLightboxBackdropClick(event) {
            if (event.target && event.target.id === 'equipment-lightbox') {
                closeLightbox();
            }
        }

        // Keyboard Navigation (Esc to close)
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeLightbox();
                closeExpandedGallery();
            }
        });

        // Initialize Card Hover Listeners
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.feature-card3');

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (!cat) return;

                card.addEventListener('mouseenter', function() {
                    showExpandedGallery(cat);
                });

                card.addEventListener('mouseleave', function() {
                    scheduleCloseExpandedGallery();
                });

                card.addEventListener('click', function() {
                    showExpandedGallery(cat);
                });
            });
        });
