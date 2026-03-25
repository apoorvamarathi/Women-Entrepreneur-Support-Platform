# Phase 1: Complete Testing Walkthrough

Here is your master guide to testing the **Women Entrepreneur Support Platform** end-to-end. We will cover the 3 core identities: **Admin, Mentor, and Entrepreneur**. Ensure your Express server (`npm start` in `backend`) and React server (`npm run dev` in `frontend`) are running.

---

## 🔑 Step 1: Login as the Admin
**Credentials:** 
- Email: `admin@weplatform.com`
- Password: `password123`

### What to test:
1. **The Navigation Bell:** Notice the Bell Icon in the top right. Click it to see any platform alerts.
2. **Dashboard Statistics:** Review the total User counts.
3. **Users Panel:** Click `Users` on the sidebar. You can inspect all registered Mentors and Entrepreneurs.
4. **Events Manager:** Click `Events` on the sidebar.
   - Click the blue `+ Create Event` button.
   - Fill out the form (e.g., "Founders Masterclass", set a date, time, and speaker).
   - Click submit. Verify the elegant Event tracking card appears on the grid.

*(When done, log out via the bottom-left sidebar button)*

---

## 🔑 Step 2: Login as a Mentor
**Credentials:** 
- Email: `sarah.tech@weplatform.com`
- Password: `password123`

### What to test:
1. **Mentor Dashboard:** Notice your specialized View. Click `Mentorship` on the sidebar.
2. **Accept Requests:** If any Entrepreneurs requested you for a session, you will see them under "Pending Requests". You can click `Accept` or `Reject`.
3. **Progress Tracking:** Once a session goes to "Upcoming Sessions", you can click `Add/Edit Note` to type private milestones about the Entrepreneur!
4. **Community Forum:** Click `Community` in the sidebar. Drop a message: *"Hi everyone! Excited to mentor new startups here!"*

*(When done, log out)*

---

## 🔑 Step 3: Login as an Entrepreneur (The Main Event!)
**Credentials:** 
- Email: `maya@founder.com`
- Password: `password123`

### What to test:
1. **Profile Completion Algorithm:**
   - Go to `Profile`. Fill in *every single field* (Location, Stage, Business Name, etc.).
   - Click `Save Profile`. It will automatically redirect you to the Dashboard.
   - Look at your **Profile Completion** dial on the Dashboard—it should now vividly render **100%**!
   - Look at the **"Recommended For You"** section at the bottom—it should dynamically recommend courses based on your saved Industry!

2. **The Auto-Matcher AI:**
   - Click `Mentorship`. Do not manually select a mentor.
   - Click the magical `✨ Auto-Match Me!` button.
   - The algorithm will instantly scan your Location, Stage, and Industry, and secretly pair you with the best available mentor, throwing a success popup with their name!

3. **Event Registration:**
   - Click `Events`. See the "Founders Masterclass" that the Admin just created?
   - Click `Register Now`. Watch the button instantly grey out and say "Registered"!

4. **Community Collaboration:**
   - Click `Community`. You will see Sarah's post! You can click `Reply` and type *"Thanks Sarah!"*. The nested thread will instantly render with your authentic Name. You can also write your own original post.

5. **Notification UX Check:**
   - After Auto-Matching a mentor or applying for Funding, look at your top-right Navbar. You will see a vibrant **Red Badge** over the Bell icon with `1` inside it.
   - Click the Bell. See your "Mentorship Request Sent" alert. Click the alert directly, and the red badge will securely vanish as the backend marks it 'Read'!

---

## Congratulations! 🏆
You have now verified the entire MVP ecosystem! Ensure your local database has been seeded (`node scripts/seedDB.js` inside the `backend` folder) if you ever need to reset the dummy accounts to a clean slate.
