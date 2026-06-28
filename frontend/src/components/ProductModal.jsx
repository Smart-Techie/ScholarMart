import React from 'react';
import { X, MessageCircle, ShieldCheck, MapPin, Tag, Share2, Star, AlertTriangle } from 'lucide-react';
import Toast from '../services/toast';

export default function ProductModal({ product, onClose, user }) {
  if (!product) return null;

  const imageUrl = product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80';
  const whatsappNumber = product.vendor_whatsapp || product.vendor?.whatsapp || '2348000000000';
  const message = encodeURIComponent(`Hi, I'm interested in buying "${product.name}" listed on ScholarMart for ₦${Number(product.price).toLocaleString()}. Is it still available?`);
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  const campusName = product.campus || product.location || 'Main Campus';
  const vendorName = product.vendor_name || product.vendor?.name || 'Verified Student Vendor';
  const dealsCompleted = product.vendor?.deals_completed || 0;
  const avgRating = product.vendor?.average_rating ? Number(product.vendor.average_rating).toFixed(1) : null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} - ScholarMart`,
          text: `Check out "${product.name}" listed for ₦${Number(product.price).toLocaleString()} on ScholarMart!`,
          url: window.location.href
        });
      } catch (err) {
        // Ignored if cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      Toast.show('Product link copied to clipboard! 📋', 'success');
    }
  };

  const handleRate = () => {
    Toast.show('Please complete a verified deal via WhatsApp before rating vendors!', 'info');
  };

  const handleReport = () => {
    Toast.show('Listing flagged for moderator review. Thank you for keeping ScholarMart safe! 🛡️', 'success');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'var(--surface)', width: '100%', maxWidth: '480px',
        maxHeight: '90vh', borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
        overflowY: 'auto', padding: '24px', position: 'relative',
        animation: 'slideUpFade 0.3s ease-out'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
            background: 'var(--background)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', backgroundColor: 'var(--background)' }}>
          <img src={imageUrl} alt={product.name} style={{ width: '100%', maxHeight: '320px', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-orange)', backgroundColor: 'rgba(249,115,22,0.1)', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
            {product.category || 'General'}
          </span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-green)', backgroundColor: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '20px' }}>
            📍 {campusName}
          </span>
          {product.condition && (
            <span style={{ fontSize: '11px', fontWeight: 700, color: product.condition === 'Used' ? 'var(--primary-orange)' : 'var(--text-primary)', backgroundColor: 'var(--background)', padding: '4px 10px', borderRadius: '20px' }}>
              {product.condition}
            </span>
          )}
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
          {product.name}
        </h2>

        <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '16px' }}>
          ₦{Number(product.price).toLocaleString()}
        </div>

        <div style={{ backgroundColor: 'var(--background)', padding: '14px 16px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
            🧑‍🎓 Seller: {vendorName}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Typically replies in 2 hours • <strong>{dealsCompleted}</strong> deals completed • <strong>{avgRating ? `${avgRating}★` : 'New Vendor'}</strong>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--background)', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Description</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {product.description || 'No detailed description provided by the vendor.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none', fontSize: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>

          <button 
            type="button"
            onClick={handleShare}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Share2 size={18} /> Share Product Link
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '12px 14px', borderRadius: '14px', fontSize: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <span>ScholarMart is a marketplace. We are not responsible for transactions between users. Always meet in public places and inspect items before paying.</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button 
              type="button"
              onClick={handleRate}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '12px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <Star size={16} /> Rate Seller
            </button>
            <button 
              type="button"
              onClick={handleReport}
              className="btn"
              style={{ flex: 1, padding: '12px', fontSize: '13px', fontWeight: 700, backgroundColor: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <AlertTriangle size={16} /> Report Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
