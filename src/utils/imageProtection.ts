/**
 * Image Protection Utility
 * Mencegah visitor download gambar dengan cara:
 * - Override right-click context menu pada gambar agar menampilkan menu halaman (back, forward, reload) bukan menu gambar
 * - Disable drag & drop gambar
 * - Disable keyboard shortcuts yang bisa digunakan untuk save gambar
 */

export const enableImageProtection = () => {
  // Track right-click pada gambar untuk redirect ke parent element
  let rightClickImage: HTMLImageElement | null = null;
  let rightClickCoords: { x: number; y: number } | null = null;

  // Deteksi right-click menggunakan mousedown (button 2)
  // Ini perlu ditangkap sebelum contextmenu event
  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 2) return; // Hanya handle right mouse button
    
    const target = e.target as HTMLElement;
    const isImage = 
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.tagName === 'PICTURE' ||
      target.closest('picture');
    
    if (isImage) {
      const imgElement = (target.tagName === 'IMG' ? target : target.closest('img')) as HTMLImageElement;
      if (imgElement) {
        rightClickImage = imgElement;
        rightClickCoords = { x: e.clientX, y: e.clientY };
        
        // Temporarily disable pointer events pada image
        // agar elementFromPoint bisa menemukan elemen di bawahnya
        const originalPointerEvents = imgElement.style.pointerEvents;
        imgElement.style.pointerEvents = 'none';
        
        // Set timeout untuk restore pointer events
        setTimeout(() => {
          if (imgElement) {
            imgElement.style.pointerEvents = originalPointerEvents;
          }
        }, 100);
      }
    }
  };

  // Override context menu pada gambar agar menampilkan menu halaman normal
  const handleContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Cek apakah yang di-klik adalah gambar atau elemen di dalam gambar
    const isImage = 
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.tagName === 'PICTURE' ||
      target.closest('picture');
    
    if (isImage) {
      // Prevent default context menu pada gambar
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Jika kita punya koordinat dari mousedown, coba cari elemen di bawah gambar
      let targetElement: HTMLElement | null = null;
      
      if (rightClickCoords && rightClickImage) {
        // Cari elemen di posisi klik (sekarang gambar sudah pointer-events: none)
        const elementBelow = document.elementFromPoint(rightClickCoords.x, rightClickCoords.y) as HTMLElement;
        
        if (elementBelow && elementBelow !== rightClickImage && !elementBelow.closest('img')) {
          targetElement = elementBelow;
        }
      }
      
      // Jika tidak ditemukan elemen di bawah, gunakan parent element
      if (!targetElement) {
        let parentElement = target.parentElement;
        while (parentElement && (
          parentElement.tagName === 'PICTURE' || 
          parentElement.closest('picture') ||
          parentElement.tagName === 'IMG'
        )) {
          parentElement = parentElement.parentElement;
        }
        targetElement = parentElement;
      }
      
      // Fallback ke body jika masih tidak ada
      const finalTarget = targetElement || document.body;
      
      // Simulasi contextmenu event pada elemen non-gambar
      // Note: Browser mungkin tidak menampilkan native context menu dari synthetic event
      // Tapi kita tetap coba untuk kompatibilitas
      requestAnimationFrame(() => {
        try {
          const syntheticEvent = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 2,
            buttons: 2,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            shiftKey: e.shiftKey,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            metaKey: e.metaKey
          });
          
          finalTarget.dispatchEvent(syntheticEvent);
        } catch (err) {
          console.debug('Context menu redirect failed:', err);
        }
      });
      
      // Reset tracking
      rightClickImage = null;
      rightClickCoords = null;
      
      return false;
    } else {
      // Reset tracking jika bukan gambar
      rightClickImage = null;
      rightClickCoords = null;
    }
  };

  // Prevent drag pada gambar
  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.tagName === 'PICTURE' ||
      target.closest('picture')
    ) {
      e.preventDefault();
      return false;
    }
  };

  // Prevent keyboard shortcuts yang bisa digunakan untuk save gambar
  // Note: Kita tidak disable semua shortcut karena bisa mengganggu UX normal
  // Fokus pada mencegah right-click dan drag sudah cukup efektif
  const handleKeyDown = (e: KeyboardEvent) => {
    // Disable Ctrl+S hanya jika user sedang fokus pada gambar
    // (meskipun ini jarang terjadi karena gambar biasanya tidak bisa di-focus)
    const target = e.target as HTMLElement;
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 's' || e.key === 'S') &&
      (target.tagName === 'IMG' || target.closest('img') || target.tagName === 'PICTURE' || target.closest('picture'))
    ) {
      e.preventDefault();
      return false;
    }
  };

  // Prevent select/copy gambar (meskipun tidak 100% efektif, tapi membantu)
  const handleSelectStart = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'IMG' ||
      target.closest('img') ||
      target.tagName === 'PICTURE' ||
      target.closest('picture')
    ) {
      e.preventDefault();
      return false;
    }
  };

  // Tambahkan event listeners
  // Gunakan capturing phase untuk mousedown agar bisa intercept sebelum event mencapai gambar
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('contextmenu', handleContextMenu, true);
  document.addEventListener('dragstart', handleDragStart);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('selectstart', handleSelectStart);

  // Return cleanup function
  return () => {
    document.removeEventListener('mousedown', handleMouseDown, true);
    document.removeEventListener('contextmenu', handleContextMenu, true);
    document.removeEventListener('dragstart', handleDragStart);
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('selectstart', handleSelectStart);
  };
};

/**
 * Tambahkan atribut CSS untuk mencegah drag pada gambar
 * dan overlay untuk capture right-click agar menampilkan menu halaman
 */
export const addImageProtectionStyles = () => {
  const styleId = 'image-protection-styles';
  
  // Hapus style yang sudah ada jika ada
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    img, picture {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);
};
